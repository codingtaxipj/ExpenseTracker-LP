function App() {
  return (
    <>
      <div className="h-screen w-screen bg-[url('./assets/dark-blue.jpg')] ">
        <div className="absolute z-0 h-screen w-screen bg-[linear-gradient(to_right,_rgba(255,255,255,0.03)_1px,_transparent_1px),linear-gradient(to_bottom,_rgba(255,255,255,0.03)_1px,_transparent_1px)] [background-size:25px_25px]">
          <div className=" m-[4rem_6rem] grid grid-cols-3">
            <div className="bg-[#ffffff] w-full col-span-3 p-[0.75rem_2rem]">
              <h1 className="font-bold text-[#000000] text-[22px]">
                Expense Tracker Application
              </h1>
            </div>
            <div className="bg-[#d6d6d6] p-5">
              <div className="border-2 border-black">
                <div className="p-2 bg-black text-white font-bold">
                  <h3>List Title</h3>
                </div>
                <div className="h-[20rem] overflow-auto">
                  <table className="w-full">
                    <tbody>
                   {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((num,key)=>(
                    <tr key={key} className="border-black border-b-[1px]">
                      <td className="p-1" >item {num}</td>
                    </tr>
                  
                   ))}
                   </tbody>
                    
                  </table>
                </div>
              </div>
            </div>
            <div className="bg-[#b4b4b4] p-5">ff</div>
            <div className="bg-[#d6d6d6] p-5">ff</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
