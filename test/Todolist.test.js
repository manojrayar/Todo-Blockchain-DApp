const Todo = artifacts.require("./Todo.sol");

contract('Todo',(accounts)=>{
    before(async ()=>{
        this.todo=await Todo.deployed()
    })

    it('deployed successfully',async()=>{
        const address= await this.todo.address
        assert.notEqual(address,0x0)
        assert.notEqual(address,"")
        assert.notEqual(address,null)
        assert.notEqual(address,undefined)

    })

    it('Lists tasks perfectly',async()=>{
        const Count= await this.todo.count()
        const task=await this.todo.tasks(Count)
        assert.equal(Count.toNumber(),task.id.toNumber())
        assert.equal(task.content,'Checking the create task method () ')
        assert.equal(task.completed,false)
        assert.equal(Count.toNumber(),1)
    })

    it('Task created successfully',async ()=>{
        const event= await this.todo.createTask('New task added')
        const eventCount=await this.todo.count()
        assert.equal(eventCount.toNumber(),2)
        const eventArgs=event.logs[0].args 
        assert.equal(eventArgs.id.toNumber(),eventCount.toNumber())
        assert.equal(eventArgs.content,'New task added')
        assert.equal(eventArgs.completed,false)
    })

    it("Task completed ",async ()=>{
        const eventToggle=await this.todo.toggle(1)
        const toggleTask=await this.todo.tasks(1)
        assert.equal(toggleTask.completed,true)
        const event=eventToggle.logs[0].args
        assert.equal(event.id.toNumber(),1)
    })

})