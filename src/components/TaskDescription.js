import react from "react"

export default function TaskDescription({ todo, onClose }) {
    return (
        <div>
            <div>
                <h1>Task details</h1>
                <button type='button' className='RemClBtn' onClick={onClose}>✖</button>
            </div>
            <div>
                <input
                    className="InputTask"
                    type='text'
                    value={todo.title}
                    onChange={() => { }}
                    style={{ width: '100%' }}
                ></input>
                <div>Status: {todo.completed ? 'Done' : 'Not Done'}</div>

                {todo.steps && todo.steps.length > 0 &&
                    <div>
                        <div>
                            <div>Steps: </div>
                            <ul className='StepListItems'>
                                {todo.steps.map((step, index) =>
                                    <li className='Step' key={index}>
                                        <label className="ChckbxWrapper">
                                            <input type='checkbox' className='Chckbx' />
                                            <label className="ChckbxCustom"></label>
                                            {step}
                                        </label>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div>
                            <input
                                className="InputTask"
                                type='text'
                                placeholder=' New step... '
                                value={''}
                                onChange={() => { }}
                                style={{ width: '100%' }}
                            ></input>
                        </div>
                    </div>
                }

                {todo.date &&
                    <div>
                        <br />
                        <div>Remind me at time/date</div>
                        <div>
                            <input
                                className="InputTask"
                                type='text'
                                value={
                                    new Date(todo.date.seconds * 1000).getHours() + ':' +
                                    new Date(todo.date.seconds * 1000).getMinutes()
                                }
                                onChange={() => { }}
                                style={{ width: '100%' }}
                            ></input>
                            <input
                                className="InputTask"
                                type='text'
                                value={
                                    new Date(todo.date.seconds * 1000).getDate() + '.' +
                                    new Date(todo.date.seconds * 1000).getMonth() + '.' +
                                    new Date(todo.date.seconds * 1000).getFullYear()
                                }
                                onChange={() => { }}
                                style={{ width: '100%' }}
                            ></input>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}