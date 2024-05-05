# React BEM this !

> A simple utility for conditionally joining classes together following BEM methodology

## Documentation

BEM documentation: https://getbem.com/

## Install

Install inside your project using NPM

```bash
npm install react-bemthis
```

## Usage

react-bemthis works better with SCSS modules for scoped styles. In this example we use SCSS but this also works with CSS

Then, declare it like this in your React component:

```typescript
import bem from "react-bemthis";
import styles from "./MyComponent.module.scss";

const { block, element } = bem(styles);
```

react-bemthis automatically detects the block of you SCSS file.

If you respect the BEM methodology, it should be the only class with no "\_\_" or "--". In any case, if you need to override the default block found, you can do `bem(styles, 'some-other-block-name')`.

Then, in your template, you can use it like this:

### Basic usage

```jsx
<ul className={block()}>
  <li className={element("item")}>
    <a href="example.com" className={element("link")}>
      Link
    </a>
  </li>
</ul>
```

### Usage with modifiers

react-bemthis also you to add modifier for both block and elements. You have multiple to apply modifiers.

For example for a block named "list", it will get the scoped styles for:

- `block("listModifier")` -> `.list .list--listModifier`
- `block(["one", "two"])` -> `.list .list--one .list--two`
- `block({ one: true, two: false })` -> `.list .list--one`

Of course, it works the same with element. For example for an element "item":

- `element("item", "itemModifier")` -> `.list__item .list__item--itemModifier`
- `element("item", ["one", "two"])` -> `.list__item .list__item--one .list__item--two`
- `element("item", { one: true, two: false })` -> `.list__item .list__item--one`

### Styles

Also, you SCSS could look like this:

```scss
.list {
  // styles for list

  &--listModifier {
    // styles for list with modifier "listModifier"
  }

  &__item {
    // styles for item

    &--itemModifier {
      //styles for item with modifier "itemModifier"
    }
  }

  &__link {
    // styles for link
  }
}
```

## Short syntax

react-bemthis gives you the possibility to replace `block` and `element` methods with respective alias `b` and `e`
