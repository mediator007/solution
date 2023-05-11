from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from keycloak import KeycloakOpenID
from pydantic import BaseModel

import os

router = APIRouter()

KEYCLOAK_URL = os.getenv("KEYCLOAK_URL", "http://localhost:3080")
KEYCLOAK_CLIENT_ID = os.getenv("KEYCLOAK_CLIENT_ID","sovkombank")
KEYCLOAK_REALM_NAME = os.getenv("KEYCLOAK_REALM_NAME","sovkombank")

keycloak_openid = KeycloakOpenID(server_url=KEYCLOAK_URL, client_id=KEYCLOAK_CLIENT_ID, realm_name=KEYCLOAK_REALM_NAME)                              

class RData(BaseModel):    
    access_token: str

@router.post("")
async def verify_token(rd: RData) -> Any:    
    #print(KEYCLOAK_URL, '   ', KEYCLOAK_CLIENT_ID, '   ', KEYCLOAK_REALM_NAME)
    #print(rd.access_token)
    #userinfo = keycloak_openid.userinfo(rd.access_token)
    #certs = keycloak_openid.certs()
    KEYCLOAK_PUBLIC_KEY = "-----BEGIN PUBLIC KEY-----\n" + keycloak_openid.public_key() + "\n-----END PUBLIC KEY-----"
    options = {"verify_signature": True, "verify_aud": False, "verify_exp": True}
    token_info = keycloak_openid.decode_token(rd.access_token, key=KEYCLOAK_PUBLIC_KEY, options=options)

    print('---------------------------')
    #print(userinfo)
    print('---------------------------')
    try:
        print(token_info["resource_access"]["sovkombank"]["roles"])    
        return {"roles": token_info["resource_access"]["sovkombank"]["roles"]}
    except:  
        return {"roles": ["Roles for Sovkombank not found"]}