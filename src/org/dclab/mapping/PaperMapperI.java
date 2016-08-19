package org.dclab.mapping;

import org.apache.ibatis.annotations.Insert;
import org.dclab.model.PaperBean;

public interface PaperMapperI {
	@Insert(" INSERT into paper VALUES (proName,proId,subName,subId,paperNum,duration,earliestSubmit,latestLogin,showMark)")
	public int addPaper(PaperBean paperBean);
}
