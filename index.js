const axios = require('axios');
var random = require('random-name')
const cheerio = require('cheerio');
const moment = require('moment');
const randUserAgent = require('rand-user-agent');
const agent = randUserAgent("desktop", "chrome", "linux");
const delay = require('delay');
const readline = require('readline-sync')
const fetch = require('node-fetch');


const randstr = length =>
    new Promise((resolve, reject) => {
        var text = "";
        var possible =
            "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        resolve(text);
    });


async function sentOTP(email) {
    const body = JSON.stringify({
        "email": email,
        "data": {},
        "create_user": true,
        "gotrue_meta_security": {}
    })
    const headers = {
        headers: {
            "x-client-info": "supabase-js/2.0.5",
            "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5cmp5Y29jdmx1b2NkZ2xpeXZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc0MDY3NzksImV4cCI6MTk4Mjk4Mjc3OX0.SLAgTxtgawJoxTXXtxfI85Q3Xz-ecBI9XkjZyKvl794",
            "content-type": "application/json;charset=UTF-8",
            "content-length": body.length,
            "accept-encoding": "gzip",
            "user-agent": "okhttp/4.9.2"
        }
    }
    return await axios.post('https://byrjycocvluocdgliyvg.supabase.co/auth/v1/otp', body, headers)
    .then((res) => {
        return {
            success: true
        }
    })
    .catch((err) => {
        return {
            success: false,
            data: err.response.data,
        }
    })
}

async function verifyOTP(email, token) {
    const body = JSON.stringify({
        "email": email,
        "token": token,
        "type": "signup",
        "gotrue_meta_security": {}
    })
    const headers = {
        headers: {
            "x-client-info": "supabase-js/2.0.5",
            "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5cmp5Y29jdmx1b2NkZ2xpeXZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc0MDY3NzksImV4cCI6MTk4Mjk4Mjc3OX0.SLAgTxtgawJoxTXXtxfI85Q3Xz-ecBI9XkjZyKvl794",
            "content-type": "application/json;charset=UTF-8",
            "content-length": body.length,
            "accept-encoding": "gzip",
            "user-agent": "okhttp/4.9.2"
        }
    }
    return await axios.post('https://byrjycocvluocdgliyvg.supabase.co/auth/v1/verify', body, headers)
    .then((res) => {
        return {
            success: true,
            data: res.data
        }
    })
    .catch((err) => {
        return {
            success: false,
            data: err.response.data
        }
    })
}

async function checkRefferal(refferal, accessToken) {
    const body = JSON.stringify({
        "code": refferal
    })
    const headers = {
        headers: {
            "x-client-info": "supabase-js/2.0.5",
            "content-profile": "public",
            "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5cmp5Y29jdmx1b2NkZ2xpeXZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc0MDY3NzksImV4cCI6MTk4Mjk4Mjc3OX0.SLAgTxtgawJoxTXXtxfI85Q3Xz-ecBI9XkjZyKvl794",
            "authorization": `Bearer ${accessToken}`,
            "content-type": "application/json;charset=UTF-8",
            "content-length": body.length,
            "accept-encoding": "gzip",
            "user-agent": "okhttp/4.9.2"
        }
    }
    return await axios.post('https://byrjycocvluocdgliyvg.supabase.co/rest/v1/rpc/referral_code_valid', body, headers)
    .then(async (res) => {
        if (res) {
            return await axios.post('https://byrjycocvluocdgliyvg.supabase.co/rest/v1/rpc/set_referred_by', body, headers)
            .then((res) => {
                return {
                    success: true
                }
            })
            .catch((err) => {
                return {
                    success: false,
                    data: err.message
                }
            })
        }
    })
    .catch((err) => {
        return {
            success: false,
            data: err.message
        }
    })
}

async function setUsername(username, accessToken) {
    const body = JSON.stringify({
        "username": username
    })
    const headers = {
        headers: {
            "x-client-info": "supabase-js/2.0.5",
            "content-profile": "public",
            "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5cmp5Y29jdmx1b2NkZ2xpeXZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc0MDY3NzksImV4cCI6MTk4Mjk4Mjc3OX0.SLAgTxtgawJoxTXXtxfI85Q3Xz-ecBI9XkjZyKvl794",
            "authorization": `Bearer ${accessToken}`,
            "content-type": "application/json;charset=UTF-8",
            "content-length": body.length,
            "accept-encoding": "gzip",
            "user-agent": "okhttp/4.9.2"
        }
    }
    return await axios.post('https://byrjycocvluocdgliyvg.supabase.co/rest/v1/rpc/username_valid', body, headers)
    .then(async(res) => {
        if (res.data) {
            return await axios.post('https://byrjycocvluocdgliyvg.supabase.co/rest/v1/rpc/set_username', body, headers)
            .then((res) => {
                return {
                    success: true,
                }
            })
            .catch((err) => {
                return {
                    success: false,
                    data: err,
                }
            })
        } else {
            console.log(res);
            return {
                success: false,
            }
        }
    })
    .catch((err) => {
        return {
            success: false,
            data: err,
        }
    })
}

const functionVerifemail = (email, domain) => new Promise((resolve, reject) => {
    fetch(`https://generator.email/${domain}/${email}`, {
            method: "Get",
            headers: {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
                "accept-encoding": "gzip, deflate, br",
                "cookie": `_ga=GA1.2.659238676.1567004853; _gid=GA1.2.273162863.1569757277; embx=%5B%22${email}%40${domain}%22%2C%22hcycl%40nongzaa.tk%22%5D; _gat=1; io=io=tIcarRGNgwqgtn40O${randstr(3)}; surl=${domain}%2F${email}`,
                "upgrade-insecure-requests": 1,
                "user-agent": agent
            }
        })
        .then(res => res.text())
        .then(text => {
            let $ = cheerio.load(text);
            let src = $('#email-table > div.e7m.row.list-group-item > div.e7m.col-md-12.ma1 > div.e7m.mess_bodiyy > h2');
            let srcc = src.text()  
            resolve(srcc);
        })
        .catch(err => reject(err));
});


(async() => {
    console.clear()
    console.log(`[ ${moment().format("HH:mm:ss")} ] ` + "========Ngebot Primal By Conny========\n")
    var tanyareff = readline.question(`[ ${moment().format("HH:mm:ss")} ] ` + 'Kode reff : ');
    var jumlah = readline.question(`[ ${moment().format("HH:mm:ss")} ] ` + 'Jumlah reff : ')

        for (var i = 0; i < jumlah; i++) {
            try {
                const list = ['tipsehat.click','pointthing.biz','atriushealth.info','blacksong.pw']
                const list1 = list[Math.floor(Math.random() * list.length)];
                var name = random.first()
                var lastname = random.last()
                var uname = `${name}${lastname}`
                var email = uname + `@` + list1;
                var kodereff = tanyareff;

                console.log('=========================================================================')
                console.log(`[ ${moment().format("HH:mm:ss")} ] ` + `Mencoba Reff ke ${i}`)
                console.log(`[ ${moment().format("HH:mm:ss")} ] ` + `Mencoba daftar dengan email ${email}`)
                const sentOtp = await sentOTP(email);
                if (!sentOtp.success) {
                    let errMsg = `[ ${moment().format("HH:mm:ss")} ] ` + `Eror Code : ${sentOtp.data.code}, msg: ${sentOtp.data.msg}
                    \r=========================================================================\n`
                    await delay(500)
                    throw errMsg
                }

                    await delay(200)

                    do {
                        kodeotp = await functionVerifemail(uname, email.split('@')[1]);
                        console.log(`[ ${moment().format("HH:mm:ss")} ] ` + `Wait for verif OTP..`)
                        var stop = false;
                        setTimeout(()=>{ stop = true; }, 30 * 1000);
                        if (stop){
                            let errMsg = `[ ${moment().format("HH:mm:ss")} ] ` + `Ulang Terlalu lama menunggu otp
                            \r=========================================================================\n`
                            await delay(500)
                            throw errMsg
                        }
                    } while (!kodeotp);
                
                console.log(`[ ${moment().format("HH:mm:ss")} ] ` + `Verifying Email with otp ${kodeotp}...`)
                const verifyOtp = await verifyOTP(email, kodeotp);
                if (!verifyOtp.success) {
                    let errMsg = `[ ${moment().format("HH:mm:ss")} ] ` + `Eror Code : ${verifyOtp.data.code}, msg: ${verifyOtp.data.msg}
                    \r=========================================================================\n`
                    await delay(500)
                    throw errMsg
                }
                const accessToken = verifyOtp.data.access_token;
                console.log(`[ ${moment().format("HH:mm:ss")} ] ` + "Trying To REFF")
                const refferal = await checkRefferal(kodereff, accessToken);
                if (!refferal.success) {
                    let errMsg = `[ ${moment().format("HH:mm:ss")} ] ` + `Eror Code : ${refferal.data.code}, msg: ${refferal.data.msg}
                    \r=========================================================================\n`
                    await delay(500)
                    throw errMsg
                }
                console.log(`[ ${moment().format("HH:mm:ss")} ] ` + `Sukses reff ke ${i}`)
                console.log('=========================================================================\n')
                await delay(200)

            } catch (error) {
                console.log(error)
                i--;
            }
            
        }
    
})()