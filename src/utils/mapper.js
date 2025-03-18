export const BADGE_MAPPER = {
  가족: "like",
  지인: "premium",
  동료: "new",
  친구: "verified",
};

export const makeBadge = (relation) => {
  return { text: relation, color: BADGE_MAPPER[relation] };
};
