import express from "express";
import { User } from "../model/index.js";
import { verifyToken } from "../utility/auth.utility.js";

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  res.send(await User.findAll());
});

router.get("/:id", verifyToken, async (req, res) => {
  res.send(await User.findByPk(req.params.id));
});

router.post("/", verifyToken, async (req, res) => {
  res.send(await User.create(req.body));
});

router.put("/:id", verifyToken, async (req, res) => {
  res.send(await User.update(req.body, { where: { id: req.params.id } }));
});

router.delete("/:id", verifyToken, async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
  // you send email to user
  // you send email adminsitr
  // you delte user's document
  res.send("Delete user");
});

// change password of user accoridng to id
router.put("/change-password/:id", verifyToken, async (req, res) => {
  const { password, newPassword, confirmPassword } = req.body;
  if (newPassword !== confirmPassword) {
    res.status(400).send("New password and confirm password do not match");
  } else {
    const user = await User.findByPk(req.params.id);
    if (user.password === password) {
      // update password
      user.password = newPassword;
      await user.save();
      res.send("Password changed successfully");
    } else {
      res.status(400).send("Old password is incorrect");
    }
  }
}
);

export { router };
