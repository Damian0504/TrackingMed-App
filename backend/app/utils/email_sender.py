import smtplib
import os
from email.message import EmailMessage

SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASS = os.getenv("SMTP_PASS")
FROM_NAME = os.getenv("EMAIL_FROM_NAME", "TrackingMed")
FROM_EMAIL = SMTP_USER

def send_password_reset_email(to_email: str, reset_link: str):
    if not (SMTP_USER and SMTP_PASS):
        raise RuntimeError("SMTP configuration missing in environment variables")

    subject = "Recupero de contraseña - TrackingMed"
    body = f"""
Hola,

Alguien (o tú) solicitó restablecer la contraseña en TrackingMed.
Para restablecer tu contraseña haz clic en el siguiente enlace:

{reset_link}

Si no solicitaste esto, ignora este correo.

Este enlace expira en 1 hora.

Saludos,
El equipo de TrackingMed
"""

    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = f"{FROM_NAME} <{FROM_EMAIL}>"
    msg["To"] = to_email
    msg.set_content(body)

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as smtp:
        smtp.ehlo()
        smtp.starttls()
        smtp.login(SMTP_USER, SMTP_PASS)
        smtp.send_message(msg)
