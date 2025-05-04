import { Spinner, ThemeProvider } from "flowbite-react";
import customTheme from "./spinner-custom";



export interface ModalNotification {
    setMessage : any[];
    setClose : () => void;
    setDelete? : (id:number) => void;
    isDelete? : boolean;
    deleteId? : number | null;
    isLoading? : boolean;
  

}

export default function ShowModal ({
    setMessage ,
    setClose,
    isDelete,
    setDelete,
    deleteId,
    isLoading

} : ModalNotification ) {
    return (
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
          <div className="flex justify-between items-center ">
            <h3 className="text-lg font-semibold text-gray-800 "> </h3>
            <button
              onClick={setClose}
              className="text-gray-500 hover:text-gray-700 font-bold text-lg"
            >
              ×
            </button>
            
          </div>
          {setMessage[0] && (
            <div className="text-center mb-4">{setMessage[0]}</div>
          )}
        
    
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {Object.entries(setMessage).map(([key, value], index) => {
              if (key !== "0" && typeof value === "object") {
                return (
                  <div key={index}>
                    {Object.entries(value).map(([field, messages]) => (
                      <div key={field}>
               
                        {Array.isArray(messages) &&
                          messages.map((msg, idx) => (
                            <div key={idx} className="text-sm text-red-500 text-center">
                              {msg}
                            </div>
                          ))}
                      </div>
                    ))}
                  </div>
                );
              }
              return null;
            })}
          </div>
            
          {isLoading && (
                <div className="flex justify-center my-4">
                    <ThemeProvider theme={customTheme}>
                    <Spinner color="base" />
                    </ThemeProvider>               
                </div>
            )
            }


            {!isLoading && (
                <div className="mt-6 flex justify-center">
                    <button
                    onClick={setClose}
                    className={`px-4 py-2 rounded  ${
                        isDelete ? 'text-gray-700 hover:bg-gray-50 border border-gray-300  ' :  'bg-orange-500 hover:bg-orange-600 text-white'
                    }`}
                    >
                    Close
                    </button>

                    {isDelete && (
                    <button
                        onClick={() => setDelete?.(deleteId!)}
                        className="px-4 py-2 bg-orange-500 mx-2 text-white rounded hover:bg-orange-600"
                    >
                        Delete
                    </button>
                    )}
                </div>
)}
        </div>
      );
      
      
}      