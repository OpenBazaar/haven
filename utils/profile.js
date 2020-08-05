export const getDefaultProfileFromPeerId = peerID => ({
  peerID,
  name: `OB ${(peerID || '').substring(0, 6)}`,
});
