import subprocess
import socket

def get_ip():
    return socket.gethostbyname(socket.gethostname())

def enable_sshd():
    subprocess.run(["sudo", "systemctl", "enable", "sshd"])
    subprocess.run(["sudo", "systemctl", "start", "sshd"])

def get_user():
    return subprocess.run(["whoami"], capture_output=True, text=True).stdout.strip()

class SSHPlugin:
    async def enable_ssh(self):
        enable_sshd()
        ip = get_ip()
        port = 22
        user = get_user()
        return {"ip": ip, "port": port, "user": user}
