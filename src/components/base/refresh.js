

export const refresh = async(token, refreshToken) => {
    fetch("/api/token/refresh", {
        method: "POST",
        headers: {
            "Authorization": `Bearer: ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"refresh": refreshToken})
    })
        .then((resp) => {
            if (resp.status !== 200) {
                sessionStorage.clear()
            } else {
                let jwt = resp.json()
                sessionStorage.setItem('token', JSON.stringify(jwt))
                return jwt
            }
        })
}