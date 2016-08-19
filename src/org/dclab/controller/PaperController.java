package org.dclab.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.dclab.model.PaperBean;
import org.dclab.service.PaperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/paper")
public class PaperController {
	
	@Autowired
	private PaperService paperService;
	public void setPaperService(PaperService paperServic) {
		this.paperService = paperServic;
	}


	@RequestMapping("/paperInput")
	public Map<String, String> paperInput(HttpServletRequest request){
		
		Map map = request.getParameterMap();
		
		Map<Integer, String> typePoints = (Map<Integer, String>) map.get("typePoints");
		
		paperService.setTypePointMap(typePoints);
		
		for(int i : typePoints.keySet()){
			paperService.getTypeNum().put(i, 0);
		}
		PaperBean paperBean = new PaperBean((String)map.get("proName"), (String)map.get("proId"), (String)map.get("subName"), (String)map.get("subId"), 
				(String)map.get("paperNum"), (int)map.get("duration"), (int)map.get("earliestSubmit"), (int)map.get("latestLogin"), (int)map.get("showMark"));
		return paperService.subjectAdd(paperBean);
	}
}
