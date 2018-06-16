ns.table.render.template = {
    "horizontal": 
        "<% " +
        "    table = o.table, " + 
        "    cols = o.cols, " +
        "    trByThead = o.trs.thead, " +
        "    trByTbody = o.trs.tbody, " +
        "    trByTfooter = o.trs.tfooter; " +
        "" +
        "%>" +
        "<table>" +
        "<% if (cols.length > 0) { %>" +
        "   <colgroup>" +
        "       <% for (i = 0, len = cols.length; i < len; i++) { %>" +
        "           <col " + "<%=ns.util.convertToAttribute(cols[i].attr)%>" + " />" +
        "       <% } %>" +
        "   </colgroup>" +
        "<% } %>" +
        "<% if (trByThead.length > 0) { %>" +
        "       <thead>" +
        "<%     for (rowIdx = 0, rowLen = trByThead.length; rowIdx < rowLen; rowIdx++) { %>" +
        "           <tr "+ "<%= ns.util.convertToAttribute(trByThead[rowIdx].attr) %>" +">" +
        "           <% for (colIdx = 0, colLen = trByThead[rowIdx].cells.length; colIdx < colLen; colIdx++) { %>" +
        "               <% if (trByThead[rowIdx].cells[colIdx] && trByThead[rowIdx].cells[colIdx].cell) { %>" +
        "                   <td " + "<%= ns.util.convertToAttribute(trByThead[rowIdx].cells[colIdx].attr) %>" + ">" + 
        "                           <%= trByThead[rowIdx].cells[colIdx].cell.data %>" + 
        "                   </td>" + 
        "               <% } %>" +
        "           <% } %>" +
        "           </tr>" +
        "<%     } %>" +
        "       </thead>" +
        "<% } %>" +
        "<% if (trByTbody.length > 0) { %>" +
        "       <tbody>" +
        "<%     for (rowIdx = 0, rowLen = trByTbody.length; rowIdx < rowLen; rowIdx++) { %>" +
        "           <tr "+ "<%= ns.util.convertToAttribute(trByTbody[rowIdx].attr) %>" +">" +
        "           <% for (colIdx = 0, colLen = trByTbody[rowIdx].cells.length; colIdx < colLen; colIdx++) { %>" +
        "               <% if (trByTbody[rowIdx].cells[colIdx] && trByTbody[rowIdx].cells[colIdx].cell) { %>" +
        "                   <td " + "<%= ns.util.convertToAttribute(trByTbody[rowIdx].cells[colIdx].attr) %>" + ">" + 
        "                           <%= trByTbody[rowIdx].cells[colIdx].cell.data %>" + 
        "                   </td>" + 
        "               <% } %>" +
        "           <% } %>" +
        "           </tr>" +
        "<%     } %>" +
        "       </tbody>" +
        "<% } %>" +
        "<% if (trByTfooter.length > 0) { %>" +
        "       <tfooter>" +
        "<%     for (rowIdx = 0, rowLen = trByTfooter.length; rowIdx < rowLen; rowIdx++) { %>" +
        "           <tr "+ "<%= ns.util.convertToAttribute(trByTfooter[rowIdx].attr) %>" +">" +
        "           <% for (colIdx = 0, colLen = trByTfooter[rowIdx].cells.length; colIdx < colLen; colIdx++) { %>" +
        "               <% if (trByTfooter[rowIdx].cells[colIdx] && trByTfooter[rowIdx].cells[colIdx].cell) { %>" +
        "                   <td " + "<%= ns.util.convertToAttribute(trByTfooter[rowIdx].cells[colIdx].attr) %>" + ">" + 
        "                           <%= trByTfooter[rowIdx].cells[colIdx].cell.data %>" + 
        "                   </td>" + 
        "               <% } %>" +
        "           <% } %>" +
        "           </tr>" +
        "<%     } %>" +
        "       </tfooter>" +
        "<% } %>" +
        "</table>",
    "vertical": 
        ""
};