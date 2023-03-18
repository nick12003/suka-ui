const disableArgs = (
  originObj: { [key: string]: any },
  conditions: {
    args: string[];
    type: string;
  }[]
) =>
  conditions.reduce(
    (acc1, { args, type }) => ({
      ...acc1,
      ...args.reduce(
        (acc2, arg) => ({
          ...acc2,
          [arg]: {
            ...(acc1[arg] ? acc1[arg] : {}),
            [type]: {
              disable: true,
            },
          },
        }),
        acc1
      ),
    }),
    originObj
  );

export { disableArgs };
