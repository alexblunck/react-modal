# react-modal

[![Latest Version on NPM](https://img.shields.io/npm/v/@blunck/react-modal.svg?style=flat-square)](https://www.npmjs.com/package/@blunck/react-modal)

Simple modals in react

## Installation
`npm i @blunck/react-modal`

## Getting Started
Add `<Modals />` component to your app. This is where the modal is rendered.
```js
import { Modals } from '@blunck/react-modal'

export default function App() {
    return (
        <div className="App">
            <Modals />
        </div>
    )
}
```

## Display Modal
Display a modal using the `Modals.display` method, pass it a react component to render as its content. Optionally you can pass an options object as the 2nd argument:
```js
import { Modals } from '@blunck/react-modal'

Modals.display(MyComponent, {
  title: 'My Title'
})
```
#### Options:
```
{String} title   - Title to display in modal header
{Number} width   - Modal window width
{Number} height  - Modal window height
{Number} padding - Modal window content padding
{Object} props   - Props to pass to component
```

## Dismiss Modal
Since you can currently only display a single modal at a time, you can use the `Modals.dismiss` method to dismiss that modal:
```js
Modals.dismiss()
```

## Limitations
- You can currently only display a single modal at a time
