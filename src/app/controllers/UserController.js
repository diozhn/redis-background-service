import randomPass from 'password-generator'
import { Mail } from '../providers/Mail'
import { RegistrationMail } from '../jobs/RegistrationMail'

export class UserController {
  async store(req, res) {
    const { name, email } = req.body

    const user = {
      name,
      email,
      password: randomPass(15, false)
    }

    await new RegistrationMail().handle({ email: user.email, name: user.name })

    return res.json(user)
  }
}