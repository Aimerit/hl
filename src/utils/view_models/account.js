function getFullName({ lastName, firstName }) {
  return lastName ? lastName.concat(' ', firstName) : '';
}

function getUsername({ account = {} }) {
  return account?.username;
}

export default { getFullName, getUsername };
