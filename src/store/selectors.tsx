export const IwantToGet = (args: string[]) => {
     return (state: any) => {
          return args.map((arg: string) => {
               return { [arg]: state.user[arg] }
          })
     }
};