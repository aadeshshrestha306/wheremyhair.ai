from pydantic import BaseModel

class SignUp(BaseModel):
    email: str
    username: str
    password: str


class LogIn(BaseModel):
    email: str
    password: str
    access_token: str
    refresh_token: str
    