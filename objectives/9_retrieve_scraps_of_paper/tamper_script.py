#!/usr/bin/env python3
from lib.core.data import kb
from lib.core.enums import PRIORITY
import string
import urllib.parse
import urllib.request

__priority__ = PRIORITY.NORMAL

def dependencies():
    pass

def tamper(payload, **kwargs):
    req = urllib.request.Request('https://studentportal.elfu.org/validator.php')
    with urllib.request.urlopen(req) as resp:
        txt = resp.read().decode('utf-8')
        return urllib.parse.quote(payload) + '&token=' + urllib.parse.quote(txt)
