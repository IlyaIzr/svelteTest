//States
export const selectFieldDefaultState = {
  options: [],
  value: '',
  isRequired: false,
  isEditable: false
}

// Functions
const optionFormatter = (options) => {
  const formatedOptions =
    options &&
    options.map((option) => {
      return {
        label: option.name,
        value: option.id,
        subtitle: option.subtitle,
      };
    });
  return formatedOptions;
};

const oneOptionFormatter = option => {
  if (option) return { label: option.name, value: option.id, subtitle: option.subtitle }
}

// Requests
export async function groupRequest(WS, payload = {}) {
  const data = await WS.send("transactions", "groupData", payload);
  data.options = optionFormatter(data.options);
  data.value = oneOptionFormatter(data.value)
  return data
}

export async function senderRequest(WS, payload = {}) {
  const data = await WS.send("transactions", "usersData", payload);
  data.options = optionFormatter(data.options);
  data.value = oneOptionFormatter(data.value)
  return data
}

// Investors

export async function groupFormRequest(WS, payload = {}) {
  const data = await WS.send("groups", "groupFormData", {payload});
  data.investorsFieldMeta.options = optionFormatter(data.investorsFieldMeta.options)
  return data
}