'use server'
import { protectLoginRules, protectSignupRules } from '@/arcjet';
import {request} from '@arcjet/next'
 export const protectSignUpAction = async(email: string) => {
    const req = await request();
    const decision = await protectSignupRules.protect(req, {email});

    if(decision.isDenied()){
        if(decision.reason.isEmail()){
            const emailTypes = decision.reason.emailTypes;
            if(emailTypes.includes('DISPOSABLE')){
                return {
                    success: false,
                    status: 403,
                    message: 'Disposable email is not allowed'
                }
            }else if(emailTypes.includes('INVALID')){
                return {
                    success: false,
                    status: 403,
                    message: 'Invalid email is not allowed'
                }

            }else if(emailTypes.includes('NO_MX_RECORDS')){
                return {
                    success: false,
                    status: 403,
                    message: 'No MX records found'
                }

            }
        }
        else if(decision.reason.isBot()){
            return {
                success: false,
                status: 403,
                message: 'Bot detected'
            }
    }else if(decision.reason.isRateLimit()){
        return {
            success: false,
            status: 403,
            message: 'Rate limit exceeded'
        }
    }
 }
    return {
        success: true,
        status: 200,
        message: 'Allowed'
    }
}


export const protectSignInAction = async(email: string) => {
    const req = await request();
    const decision = await protectLoginRules.protect(req, {email});

    if(decision.isDenied()){
        if(decision.reason.isEmail()){
            const emailTypes = decision.reason.emailTypes;
            if(emailTypes.includes('DISPOSABLE')){
                return {
                    success: false,
                    status: 403,
                    message: 'Disposable email is not allowed'
                }
            }else if(emailTypes.includes('INVALID')){
                return {
                    success: false,
                    status: 403,
                    message: 'Invalid email is not allowed'
                }

            }else if(emailTypes.includes('NO_MX_RECORDS')){
                return {
                    success: false,
                    status: 403,
                    message: 'No MX records found'
                }

            }
        }
 }
    return {
        success: true,
        status: 200,
        message: 'Allowed'
    }
}