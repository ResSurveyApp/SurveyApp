const Rdata = ( Rvalue ) => {
    if(Rvalue === 'R1'){
      return 'Robustness'
    }else if(Rvalue === 'R2'){
      return 'Redundancy'
    }else if(Rvalue === 'R3'){
      return 'Resourcefulness'
    }else if(Rvalue === 'R4'){
      return 'Rapidity'
    }
  }

  export default Rdata;