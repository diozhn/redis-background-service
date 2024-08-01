import randomPass from 'password-generator'
import { addJob } from '../providers/Queue'

export class UserController {
  async store(req, res) {
    const { name, email } = req.body

    const user = {
      name,
      email,
      password: randomPass(15, false)
    }

    await addJob('RegistrationMail', { ...user })

    return res.json(`Your account registered successfully, check your email to check your password.`)
  }
}