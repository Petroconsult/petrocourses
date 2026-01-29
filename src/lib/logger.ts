export const log = (...args: any[]) => {
  // Structured console logging for traceability in dev/test
  console.log(new Date().toISOString(), ...args)
}

export const error = (...args: any[]) => {
  console.error(new Date().toISOString(), ...args)
}
