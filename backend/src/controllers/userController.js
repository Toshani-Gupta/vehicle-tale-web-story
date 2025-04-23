import userModel from '../models/userModel.js';

export const getProfile = async (req, res) => {
  try {
    const user = await userModel.getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove sensitive data
    const { password, ...userWithoutPassword } = user;

    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Error getting profile' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, contactEmail, phone, gender, needs } = req.body;
    const userId = req.user.id;

    const updatedUser = await userModel.updateUser(userId, {
      name,
      contactEmail,
      phone,
      gender,
      needs
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove sensitive data
    const { password, ...userWithoutPassword } = updatedUser;

    res.json({
      message: 'Profile updated successfully',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
}; 