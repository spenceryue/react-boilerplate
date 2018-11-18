export default function merging(setter) {
  return update =>
    setter(prev =>
      update instanceof Function
        ? { ...prev, ...update(prev) }
        : { ...prev, ...update }
    );
}
