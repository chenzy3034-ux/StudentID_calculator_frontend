# Frontend Code Style

**Source:** This project is based on the
[Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html).
The rules below are a concise React/Vite adaptation for this repository. Where
this document differs from the source guide, this document is the rule for this
project.

## Scope

These rules apply to JavaScript, JSX, and frontend tests in this repository.
Use modern browser JavaScript and ES modules. Do not add TypeScript syntax to
JavaScript files.

## Formatting

- Save source files as UTF-8 with LF line endings and a final newline.
- Indent with 2 spaces. Do not use tabs for indentation.
- Keep lines at 100 characters or fewer when practical. Wrap JSX props and
  function arguments when a line becomes difficult to scan.
- Use single quotes in JavaScript. JSX attributes use double quotes.
- Omit semicolons consistently. Put one statement on each line and avoid
  automatic-semicolon-insertion hazards.
- Include trailing commas in multiline arrays, objects, imports, parameters,
  and calls where JavaScript permits them.
- Put spaces around binary operators and after commas. Keep opening braces on
  the same line as the declaration or control statement.

## Naming and files

- Use `camelCase` for variables, functions, hooks, and object properties.
- Use `PascalCase` for React components and their `.jsx` filenames, such as
  `HistoryList.jsx`.
- Use `UPPER_SNAKE_CASE` only for true module-level constants.
- Name event handlers `handleAction` inside a component and callback props
  `onAction`, for example `handleDelete` and `onDelete`.
- Prefer descriptive names such as `isHistoryLoading` and `historyId`. Avoid
  unexplained abbreviations.
- Keep one principal React component per component file.

## JavaScript rules

- Use `const` by default and `let` only when a binding must be reassigned.
  Never use `var`.
- Use `===` and `!==`; do not rely on coercive equality.
- Use template literals for interpolation and readable string composition.
- Use optional chaining and nullish handling when reading uncertain API data.
- Never use `eval`, `Function`, or another mechanism that executes text as
  JavaScript.
- Do not leave `console.log` or debugger statements in committed application
  code.
- Comments explain intent or constraints. Do not restate an obvious line of
  code.

## React rules

- Use function components and React hooks.
- Call hooks unconditionally at the top level of a component.
- Keep state in the closest component that owns it. Do not store values that
  can be derived directly during rendering.
- Do not mutate state arrays or objects. Replace them through their state
  setter.
- Use stable database IDs as list keys.
- Give buttons an explicit `type`. Associate inputs with labels and provide
  accessible names for icon-only or context-dependent controls.
- Show loading and error states for asynchronous operations.

## API and calculator boundaries

- Keep HTTP calls in `src/services/`; components must not assemble backend
  URLs directly.
- All final mathematical results must come from `POST /api/calculate`. Frontend
  code may convert display symbols `×` and `÷` to API symbols `*` and `/`, but
  it must not evaluate the expression.
- Load history from `GET /api/history` and delete records through
  `DELETE /api/history/{id}`. Do not persist history in LocalStorage,
  SessionStorage, or application-only memory.
- After a successful calculation or deletion, refresh the displayed history
  from the backend.
- Display safe messages from the API and a clear connection error when the
  backend cannot be reached.

## Verification

Before committing frontend changes, run:

```sh
npm run build
```

Exercise calculation, error, history refresh, and deletion flows whenever API
or state-management code changes.
