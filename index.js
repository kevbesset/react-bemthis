import classNames from "classnames";

function autoDetectBlock(styles) {
  const block = Object.keys(styles).find(
    (className) => !className.includes("--") && !className.includes("__")
  );

  if (!block) throw new Error("No block found, are you using BEM?");

  return block;
}

export default function bemthis(styles, forceBlock = undefined) {
  const block = forceBlock || autoDetectBlock(styles);

  const response = {
    block(modifiers) {
      const classKeyList = bemify(block, undefined, modifiers);

      return classNames(classKeyList.map((classKey) => styles[classKey]));
    },
    element(element, modifiers) {
      const classKeyList = bemify(block, element, modifiers);

      return classNames(classKeyList.map((classKey) => styles[classKey]));
    },
  };

  return {
    ...response,
    b: response.block,
    e: response.element,
  };
}

function bemify(block, element, modifiers) {
  const classList = [];

  if (!block) return [];

  let classElement = block;

  if (element) {
    classElement = `${block}__${element}`;
  }

  classList.push(classElement);

  applyModifiers(classElement, modifiers, classList);

  return classList;
}

function applyModifiers(element, modifiers, classList) {
  if (modifiers) {
    if (typeof modifiers === "string") {
      modifiers.split(" ").forEach((mod) => {
        classList.push(`${element}--${mod}`);
      });
    } else if (Array.isArray(modifiers)) {
      modifiers.forEach((mod) => {
        applyModifiers(element, mod, classList);
      });
    } else if (typeof modifiers === "object") {
      Object.entries(modifiers).forEach(([key, value]) => {
        if (value) {
          key.split(" ").forEach((mod) => {
            classList.push(`${element}--${mod}`);
          });
        }
      });
    } else {
      throw "Invalid type for modifiers";
    }
  }
}
