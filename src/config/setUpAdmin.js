import User from "../model/user"

const createAdminUser = async ()=>{
    const admin = User.create({
        firstname: "admin",
        lastname: "admin",
        email: "admin@admin.com",
        password:"admin1234",
        role:"admin"
    })

    return admin
}

export default createAdminUser;
// bu dosyayı herhangi bir yerde kullanmadım. ilk açıldığında admin 
// otamatik oluşturulsun diye yapmaya çalışıyorum.