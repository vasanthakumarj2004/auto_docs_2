<?php
// Docsynecx Secure Server SMTP Gateway for IICS Pilot & Event Meeting
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['success' => false, 'error' => 'Method Not Allowed']);
  exit(0);
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data) {
  http_response_code(400);
  echo json_encode(['success' => false, 'error' => 'Invalid JSON input']);
  exit(0);
}

$action = $data['action'] ?? 'iics_pilot';
$payload = $data['payload'] ?? $data['data'] ?? $data;

// SMTP Server Configuration (Server-Side Only)
$smtpHost = 'mail.docsynecx.com';
$smtpPort = 465;
$smtpUser = 'no-reply@docsynecx.com';
$smtpPass = '%cbNZ5ch{BD9@hQV';
$adminEmail = 'admin@docsynecx.com';

function sendSmtpMail($to, $subject, $htmlBody, $replyTo = null, $fromName = 'Docsynecx')
{
  global $smtpHost, $smtpPort, $smtpUser, $smtpPass;

  $context = stream_context_create([
    'ssl' => [
      'verify_peer' => false,
      'verify_peer_name' => false,
      'allow_self_signed' => true
    ]
  ]);

  $socket = @stream_socket_client("ssl://{$smtpHost}:{$smtpPort}", $errno, $errstr, 15, STREAM_CLIENT_CONNECT, $context);
  if (!$socket) {
    return ['success' => false, 'error' => "Failed to connect to SMTP: {$errstr} ({$errno})"];
  }

  $read = function () use ($socket) {
    $response = '';
    while ($line = fgets($socket, 512)) {
      $response .= $line;
      if (isset($line[3]) && $line[3] === ' ')
        break;
    }
    return $response;
  };

  $send = function ($cmd) use ($socket, $read) {
    fputs($socket, $cmd . "\r\n");
    return $read();
  };

  $read(); // greeting
  $send("EHLO " . gethostname());
  $send("AUTH LOGIN");
  $send(base64_encode($smtpUser));
  $authRes = $send(base64_encode($smtpPass));

  if (strpos($authRes, '235') === false) {
    fclose($socket);
    return ['success' => false, 'error' => "SMTP Authentication failed: {$authRes}"];
  }

  $send("MAIL FROM:<{$smtpUser}>");
  $send("RCPT TO:<{$to}>");
  $send("DATA");

  $headers = [
    "From: =?UTF-8?B?" . base64_encode($fromName) . "?= <{$smtpUser}>",
    "To: <{$to}>"
  ];
  if (!empty($replyTo)) {
    $headers[] = "Reply-To: <{$replyTo}>";
  }
  $headers[] = "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=";
  $headers[] = "MIME-Version: 1.0";
  $headers[] = "Content-Type: text/html; charset=UTF-8";
  $headers[] = "Content-Transfer-Encoding: base64";
  $headers[] = "Date: " . date('r');
  $headers[] = "X-Mailer: Docsynecx Server Mailer";

  $emailContent = implode("\r\n", $headers) . "\r\n\r\n" . chunk_split(base64_encode($htmlBody)) . "\r\n.";
  $sendRes = $send($emailContent);
  $send("QUIT");
  fclose($socket);

  if (strpos($sendRes, '250') === false) {
    return ['success' => false, 'error' => "SMTP send failed: {$sendRes}"];
  }

  return ['success' => true];
}

try {
  if ($action === 'event_meeting' || $action === 'sendEventMeetingEmail') {
    $email = filter_var($payload['email'] ?? '', FILTER_SANITIZE_EMAIL);
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      http_response_code(400);
      echo json_encode(['success' => false, 'error' => 'A valid email address is required']);
      exit(0);
    }

    $name = htmlspecialchars(trim($payload['name'] ?? 'Attendee'));
    $company = htmlspecialchars(trim($payload['company'] ?? 'Valued Partner'));
    $phone = htmlspecialchars(trim($payload['phone'] ?? 'N/A'));
    $event = htmlspecialchars(trim($payload['event'] ?? 'IICS 2026'));
    $booth = htmlspecialchars(trim($payload['booth'] ?? 'Booth Q53'));
    $msg = htmlspecialchars(trim($payload['message'] ?? 'N/A'));

    $subjectLine = "[Meeting Reserved] Docsynecx at IICS 2026 ({$booth}) - {$name}";

    $attendeeHtml = "
<div style=\"font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; color: #1f2937;\">
  <div style=\"background: #1F6B45; padding: 24px 32px; color: #ffffff;\">
    <div style=\"font-size: 22px; font-weight: 700;\">Docsynecx</div>
    <div style=\"font-size: 14px; opacity: 0.9; margin-top: 4px;\">IICS 2026 Booth Meeting</div>
  </div>
  <div style=\"padding: 32px;\">
    <h2 style=\"font-size: 18px; font-weight: 700; margin: 0 0 12px; color: #111827;\">Meeting Request Confirmed</h2>
    <p style=\"font-size: 15px; line-height: 1.6; color: #4b5563;\">
      Hello <strong>{$name}</strong>, we have received your request to meet the Docsynecx team at the <strong>India International Cargo Show (IICS) 2026</strong>.
    </p>
    <div style=\"background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin: 20px 0;\">
      <p style=\"margin: 4px 0;\"><strong>Location:</strong> {$booth}, Jio World Convention Centre, BKC, Mumbai</p>
      <p style=\"margin: 4px 0;\"><strong>Company:</strong> {$company}</p>
      <p style=\"margin: 4px 0;\"><strong>Mobile/WA:</strong> {$phone}</p>
      <p style=\"margin: 4px 0;\"><strong>Notes/Topic:</strong> {$msg}</p>
    </div>
    <p style=\"font-size: 14px; line-height: 1.6; color: #4b5563;\">
      Our team will connect with you to align on your preferred time slot at the booth.
    </p>
  </div>
  <div style=\"background: #f9fafb; padding: 16px 32px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af; text-align: center;\">
    © 2026 Docsynecx · Logistics AI Platform
  </div>
</div>";

    $adminHtml = "
<div style=\"font-family: sans-serif; padding: 20px; color: #222;\">
  <h2>New IICS 2026 Booth Meeting Request</h2>
  <ul>
    <li><strong>Attendee:</strong> {$name}</li>
    <li><strong>Company:</strong> {$company}</li>
    <li><strong>Email:</strong> {$email}</li>
    <li><strong>Phone/WA:</strong> {$phone}</li>
    <li><strong>Event:</strong> {$event} ({$booth})</li>
    <li><strong>Notes:</strong> {$msg}</li>
  </ul>
</div>";

    sendSmtpMail($email, $subjectLine, $attendeeHtml, null, 'Docsynecx Event Team');
    sendSmtpMail($adminEmail, "[IICS Meeting Lead] {$name} - {$company}", $adminHtml, $email, 'Docsynecx Leads');

    echo json_encode(['success' => true]);
    exit(0);
  }

  // Default: iics_pilot
  $email = filter_var($payload['email'] ?? '', FILTER_SANITIZE_EMAIL);
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'A valid email address is required']);
    exit(0);
  }

  $name = htmlspecialchars(trim($payload['name'] ?? 'Attendee'));
  $company = htmlspecialchars(trim($payload['company'] ?? 'Valued Partner'));
  $phone = htmlspecialchars(trim($payload['phone'] ?? 'N/A'));
  $day = htmlspecialchars(trim($payload['day'] ?? 'Day 1'));
  $slot = htmlspecialchars(trim($payload['slot'] ?? 'TBD'));
  $role = htmlspecialchars(trim($payload['role'] ?? 'N/A'));
  $system = htmlspecialchars(trim($payload['system'] ?? 'N/A'));
  $volume = htmlspecialchars(trim($payload['volume'] ?? 'N/A'));
  $pain = htmlspecialchars(trim($payload['pain'] ?? 'N/A'));
  $booth = htmlspecialchars(trim($payload['booth'] ?? 'Booth Q53'));
  $type = $payload['type'] ?? '';

  $isRequest = ($type === 'request') || (stripos($slot, 'to be') !== false) || (stripos($day, 'custom') !== false);
  $statusText = $payload['status'] ?? ($isRequest ? 'Requested (To Be Coordinated)' : 'Confirmed');

  $subjectLine = $isRequest
    ? "Request Received Docsynecx IICS 2026 Pilot Walkthrough Custom Slot"
    : "Confirmation Docsynecx IICS 2026 Pilot Walkthrough";

  $attendeeHtml = "
  <div style=\"font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; color: #1f2937;\">
    <div style=\"background: #1F6B45; padding: 24px 32px; color: #ffffff;\">
      <div style=\"font-size: 22px; font-weight: 700;\">Docsynecx</div>
      <div style=\"font-size: 14px; opacity: 0.9; margin-top: 4px;\">IICS 2026 Pilot Walkthrough</div>
    </div>
    <div style=\"padding: 32px;\">
      <div style=\"display: inline-block; background: #ecfdf5; color: #047857; font-size: 13px; font-weight: 600; padding: 4px 12px; border-radius: 9999px; margin-bottom: 16px;\">
        Status: {$statusText}
      </div>
      <h2 style=\"font-size: 20px; font-weight: 700; margin: 0 0 12px; color: #111827;\">{$subjectLine}</h2>
      <p style=\"font-size: 15px; line-height: 1.6; color: #4b5563; margin: 0 0 24px;\">
        Hello <strong>{$name}</strong>, thank you for reserving your 1-Month Pilot Walkthrough session with Docsynecx for <strong>{$company}</strong>.
      </p>
      <div style=\"background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 18px; margin-bottom: 24px;\">
        <table style=\"width: 100%; border-collapse: collapse; font-size: 14px;\">
          <tr style=\"border-bottom: 1px solid #f3f4f6;\"><td style=\"padding: 9px 0; color: #6b7280;\">Date & Time</td><td style=\"padding: 9px 0; font-weight: 600;\">{$day} at {$slot} IST</td></tr>
          <tr style=\"border-bottom: 1px solid #f3f4f6;\"><td style=\"padding: 9px 0; color: #6b7280;\">Location</td><td style=\"padding: 9px 0; font-weight: 600;\">{$booth}, Jio World Convention Centre, BKC, Mumbai</td></tr>
          <tr style=\"border-bottom: 1px solid #f3f4f6;\"><td style=\"padding: 9px 0; color: #6b7280;\">Desk Role</td><td style=\"padding: 9px 0; font-weight: 600;\">{$role}</td></tr>
          <tr style=\"border-bottom: 1px solid #f3f4f6;\"><td style=\"padding: 9px 0; color: #6b7280;\">Current System</td><td style=\"padding: 9px 0; font-weight: 600;\">{$system}</td></tr>
          <tr><td style=\"padding: 9px 0; color: #6b7280;\">Weekly Volume</td><td style=\"padding: 9px 0; font-weight: 600;\">{$volume} quotes/enquiries</td></tr>
        </table>
      </div>
      <p style=\"font-size: 14px; line-height: 1.6; color: #6b7280; margin: 0;\">
        Need to reschedule or reach us immediately? Reply directly to this email or reach us on WhatsApp ({$phone}).
      </p>
    </div>
    <div style=\"background: #f9fafb; padding: 16px 32px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af; text-align: center;\">
      © 2026 Docsynecx · Logistics AI Platform · docsynecx.com
    </div>
  </div>";

  $adminHtml = "
<div style=\"font-family: sans-serif; padding: 20px; color: #222;\">
  <h2>New IICS 2026 Pilot Booking / Walkthrough Lead</h2>
  <p><strong>Status:</strong> {$statusText}</p>
  <ul>
    <li><strong>Name:</strong> {$name}</li>
    <li><strong>Company:</strong> {$company}</li>
    <li><strong>Email:</strong> {$email}</li>
    <li><strong>Phone/WA:</strong> {$phone}</li>
    <li><strong>Reserved Slot:</strong> {$day} at {$slot} IST</li>
    <li><strong>Event:</strong> IICS 2026 ({$booth})</li>
    <li><strong>Role:</strong> {$role}</li>
    <li><strong>System:</strong> {$system}</li>
    <li><strong>Volume:</strong> {$volume}</li>
    <li><strong>Pain Point:</strong> {$pain}</li>
  </ul>
</div>";

  sendSmtpMail($email, $subjectLine, $attendeeHtml, null, 'Docsynecx IICS 2026');
  sendSmtpMail($adminEmail, "[Lead Notification] {$subjectLine} - {$company}", $adminHtml, $email, 'Docsynecx Leads');

  echo json_encode(['success' => true]);
} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(['success' => false, 'error' => 'Unable to send email at this time']);
}
