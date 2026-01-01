import * as React from "react";

type Values = { email: string };

export function AccessibleForm() {
  const [values, setValues] = React.useState<Values>({ email: "" });
  const [error, setError] = React.useState<string | null>(null);

  const helpId = React.useId();
  const errorId = React.useId();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    alert("Submitted!");
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <div>
        <label htmlFor="email">Email</label>
        <div id={helpId}>We’ll never share your email.</div>

        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={(e) => setValues({ email: e.target.value })}
          aria-describedby={error ? `${helpId} ${errorId}` : helpId}
          aria-invalid={error ? "true" : "false"}
        />

        {error && (
          <div id={errorId} role="alert">
            {error}
          </div>
        )}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
