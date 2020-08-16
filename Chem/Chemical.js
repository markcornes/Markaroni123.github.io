
class Chemical {
  constructor(chainLength){
    this.length = chainLength;
    this.funcs = []
  }

  functionalGroup(group, chainPlace){
    this.funcs.push([group, chainPlace])
  }
}
