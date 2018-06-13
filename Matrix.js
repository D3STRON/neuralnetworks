
class Matrix{
    constructor(rows, cols)
    {
        this.rows=rows
        this.cols=cols
        this.data=[]
        for(let i=0;i<this.rows;i++)
        {
            this.data[i]=[]
            for(let j=0;j<this.cols;j++)
            {
                this.data[i][j]=0;
            }
        }
    }
    
    randomize()
    {
        for(let i=0;i<this.rows;i++)
        {
            for(let j=0;j<this.cols;j++)
            {
                this.data[i][j]=Math.floor(Math.random()*10);
            }
        }
    }
    static transpose(A)
    {
        if(A instanceof Matrix)
        {
           var B= new Matrix(A.cols,A.rows)
           for(let i=0;i<A.rows;i++)
           {
               for(let j=0;j<A.cols;j++)
               {
                   B.data[j][i]=A.data[i][j];
               }
           } 
           return B
        }
        else{
            console.log("Input is not of class Matrix")
            return undefined
        }
    }
    static multiply(A,B)
    {
        if (A.cols!== B.rows){
            console.log('Improper Matrix Multiplication A cols is not equal B rows')
            return undefined
        }
        var C = new Matrix(A.rows,B.cols)
        for(let i=0;i<A.rows;i++)
        {
            for(let j=0;j<B.cols;j++)
            {
                C.data[i][j]=0
                for(let k=0;k<A.cols;k++)
                {
                    C.data[i][j]+=A.data[i][k]*B.data[k][j]
                }
            }
        }
        return C
    }
    map(func)
    {
        for(let i=0;i<this.rows;i++)
        {
            for(let j=0;j<this.cols;j++)
            {
                this.data[i][j]=func(this.data[i][j]);
            }
        }
    }
}
