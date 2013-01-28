describe("MY3.isNormalised", function() {
  it("knows that the zero vector is not normal", function() {
    expect(MY3.isNormalised(new THREE.Vector3(0,0,0))).toBe(false);
  });
  it("knows that a vector length which is 0.0045 away from normal length is still normal", function() {
    expect(MY3.isNormalised(new THREE.Vector3(0.58,0.58,0.58))).toBe(true);
  });
});