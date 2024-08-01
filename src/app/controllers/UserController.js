import randomPass from 'password-generator'
import { RegistrationMail } from '../jobs/RegistrationMail'
import { addJob } from '../providers/Queue'

export class UserController {
  async store(req, res) {
    const { name, email } = req.body

    const user = {
      name,
      email,
      password: randomPass(15, false)
    }

    await addJob({ email: user.email, name: user.name })

    return res.json(user)
  }
}