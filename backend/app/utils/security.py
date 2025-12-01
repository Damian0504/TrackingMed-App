from passlib.context import CryptContext

# Contexto bcrypt para hashing seguro
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    """
    Genera un hash seguro a partir de una contraseña en texto plano.
    bcrypt solo soporta hasta 72 bytes, así que truncamos para evitar errores.
    """
    password = password[:72]   # 🔥 Fix definitivo
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    """
    Verifica si una contraseña coincide con su hash almacenado.
    Se trunca a 72 para coincidir con las reglas de bcrypt.
    """
    plain = plain[:72]         # 🔥 Fix definitivo
    return pwd_context.verify(plain, hashed)
