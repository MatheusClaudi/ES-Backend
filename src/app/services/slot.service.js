const { Slot, User } = require('../models');

const create = async (data) => {
  const slot = await Slot.create(data);

  if (!slot) {
    return null;
  }

  return slot;
};

const verifySlotExist = async (calendarId, initialDate) => {
  const slot = await Slot.findOne({
    where: {
      calendarId,
      initialDate,
    },
  });

  if (!slot) {
    return null;
  }

  return slot;
};

const getSlot = async (calendarId, slotId) => {
  const slot = await Slot.findOne({
    where: {
      calendarId,
      id: slotId,
    },
  });

  if (!slot) {
    return null;
  }

  return slot;
};

const getVaccineAvailableBySlot = async (slotId) => {
  const slot = await Slot.findOne({
    where: {
      id: slotId,
    },
    include: [
      {
        model: User,
        as: 'users',
        attributes: ['id'],
      },
    ],
  });

  const quantity = slot.qtdVaccine - slot.users.length;

  if (quantity <= 0) {
    return false;
  }

  return true;
};

module.exports = {
  create,
  verifySlotExist,
  getSlot,
  getVaccineAvailableBySlot,
};
