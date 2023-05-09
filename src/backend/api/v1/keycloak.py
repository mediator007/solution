from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from keycloak import KeycloakOpenID
from pydantic import BaseModel

import os

router = APIRouter()

KEYCLOAK_URL = os.getenv(KEYCLOAK_URL, "http://localhost:3080/")
KEYCLOAK_CLIENT_ID = os.getenv(KEYCLOAK_CLIENT_ID,"sovkombank")
KEYCLOAK_REAL_NAME = os.getenv(KEYCLOAK_REAL_NAME,"sovkombank")

keycloak_openid = KeycloakOpenID(KEYCLOAK_URL, KEYCLOAK_CLIENT_ID, KEYCLOAK_REALM_NAME)                               

class RData(BaseModel):    
    access_token: str

@router.post("")
async def verify_token(rd: RData) -> Any:    

    userinfo = keycloak_openid.userinfo(rd.access_token)
    #certs = keycloak_openid.certs()
    KEYCLOAK_PUBLIC_KEY = "-----BEGIN PUBLIC KEY-----\n" + keycloak_openid.public_key() + "\n-----END PUBLIC KEY-----"
    options = {"verify_signature": True, "verify_aud": False, "verify_exp": True}
    token_info = keycloak_openid.decode_token(rd.access_token, key=KEYCLOAK_PUBLIC_KEY, options=options)

    print('---------------------------')
    print(userinfo)
    print('---------------------------')
    print(token_info['resource_access']['sovkombank']['roles'])    
    print('---------------------------')

    return {"roles": token_info['resource_access']['sovkombank']['roles']}