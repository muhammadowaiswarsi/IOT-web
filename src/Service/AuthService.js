import { Auth } from 'aws-amplify'

export const signup = (userObj) => {
    const {
        email,
        password,
        profile
    } = userObj;
    return new Promise(async (resolve, reject) => {
        try {
            const newUser = await Auth.signUp({
                username: email,
                password,
                attributes: {
                    profile
                }
            });
            resolve({ user_id: newUser.userSub, confirmed: false });
        } catch (error) {
            reject(error);
        };

    });
}


export const confirm = (user_id, confirmationCode) => {
    return new Promise(async (resolve, reject) => {
        try {
            const confirmedUser = await Auth.confirmSignUp(user_id, confirmationCode);
            resolve(confirmedUser);
        } catch (error) {
            // ALERT here we can check which error we are receiving
            reject(error.message)
        }
    });
}

export const login = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await Auth.signIn(email, password);
            resolve(user);
        } catch (e) {
            reject(e.message)
        }

    });
}

export const logout = () => {
    return new Promise(async (resolve, reject) => {
        try {
            await Auth.signOut();
            resolve(true);
        } catch (error) {
            reject(error)
        }
    })
};

export const forgotPassword = (username) => {
    return Auth.forgotPassword(username)
};

export const confirmNewPassword = (user, oldPassword, newPassword) => {
    return Auth.forgotPasswordSubmit(user, oldPassword, newPassword)
};

export const changePassword = (payload) => {
    return new Promise((resolve, reject) => {
        Auth.currentAuthenticatedUser()
            .then(user => {
                const { oldPassword, newPassword } = payload;
                return Auth.changePassword(user, oldPassword, newPassword);
            })
            .then(data => {
                resolve({ user_id: data.userSub, confirmed: false });
            })
            .catch(err => {
                reject(err)
            });
    })
}


export const isLoggedIn = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const exist = Auth.currentAuthenticatedUser()
            resolve(exist)
        }
        catch (err) {
            reject(err);
        }
    });
}