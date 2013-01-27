describe("MY3.isNormal", function() {
  it("knows that the zero vector is not normal", function() {
    expect(MY3.isNormal(new THREE.Vector3(0,0,0)) === false);
  });
  it("knows that a vector length which is 0.0045 away from normal length is still normal", function() {
    expect(MY3.isNormal(new THREE.Vector3(0.58,0.58,0.58)) === true);
  });
});