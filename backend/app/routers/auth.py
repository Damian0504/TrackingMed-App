from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.post('/login')
async def login(payload: dict):
    # STUB: acepta cualquier email y devuelve token falso
    email = payload.get('email')
    if not email:
        raise HTTPException(status_code=400, detail='email required')
    return {
        'token': 'fake-jwt-token',
        'user': {'name': email.split('@')[0], 'email': email}
    }
