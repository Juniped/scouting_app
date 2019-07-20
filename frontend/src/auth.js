export const isAuthenticated = user => !!user;

export const isAllowed = (user, rights) =>
    rights.some(right => user.rights.includes(right));

export const hasRole = (userRoles, roles) =>
    roles.some(role => userRoles.includes(role));