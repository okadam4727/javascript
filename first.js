document.getElementById('input-excel').addEventListener('change', handleFile, false);

let workData;
    function handleFile(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = function (event) {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Assume the first sheet contains the relevant data
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName]);


        worksheet.forEach((data , index) => {
          //  console.log(data,  ' ', index);

            
        
            const total=data.hindi+data.history+data.marathi+data.math;
           // console.log(total);

            data.total=total;

            const percentage=(total/500)*100;
          //  console.log(percentage);

            data.percentage=percentage;


            
    });

     // Display JSON data
        displayData(worksheet);

        workData = worksheet;
        
        // let jsonData=worksheet;
      //  exportToExcel(worksheet)
        
      };
      reader.readAsArrayBuffer(file);
      

     
    }

      function displayData(data) {
      const jsonData = JSON.stringify(data, null, 2); // Convert JSON object to string with indentation
      
      document.getElementById('output').innerHTML = `<pre>${jsonData}</pre>`;
      console.log(jsonData);
      
    }

    function exportToExcel() {
        // Convert JSON to worksheet
        const worksheet = XLSX.utils.json_to_sheet(workData);
  
        // Create a new workbook
        const workbook = XLSX.utils.book_new();
  
        // Append the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  
        // Generate and download the Excel file
        XLSX.writeFile(workbook, "data.xlsx");
      }

    

  
      







   