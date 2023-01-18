const endpoints = {
  users: {
    createUser: "/users",
    getUser: "/users",
    getUserById: "/users/:id",
  },
  auth: {
    token: "/auth/refresh",
    login: "/auth/login",
    logout: "/users/logout",
  },
  nurse: {
    getAllNurse: "/nurses",
    getAllNurseById: "/nurses/:nurseId",
    createNurse: "/nurses",
    updateNurse: "/nurses/:nurseId",
    deleteNurse: "/nurses/:nurseId",
  },
};

export default endpoints;
