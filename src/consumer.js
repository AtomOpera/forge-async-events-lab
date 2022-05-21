import Resolver from "@forge/resolver";
const resolver = new Resolver();

resolver.define("event-listener", async ({ payload, context }) => {
  // process the event
  await new Promise((r) => setTimeout(r, 2000));
  console.log('payload', payload);
  console.log('context', context);
});

export const handler = resolver.getDefinitions();