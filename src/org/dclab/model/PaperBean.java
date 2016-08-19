package org.dclab.model;

public class PaperBean {
	private String proName;
	private String proId;
	private String subName;
	private String subId;
	private String paperNum;
	private int duration;
	private int earliestSubmit;
	private int latestLogin;
	private int showMark;
	//*************
	
	
	public String getProName() {
		return proName;
	}
	public PaperBean(String proName, String proId, String subName, String subId, String paperNum, int duration,
			int earliestSubmit, int latestLogin, int showMark) {
		super();
		this.proName = proName;
		this.proId = proId;
		this.subName = subName;
		this.subId = subId;
		this.paperNum = paperNum;
		this.duration = duration;
		this.earliestSubmit = earliestSubmit;
		this.latestLogin = latestLogin;
		this.showMark = showMark;
	}
	public void setProName(String proName) {
		this.proName = proName;
	}
	public String getProId() {
		return proId;
	}
	public void setProId(String proId) {
		this.proId = proId;
	}
	public String getSubName() {
		return subName;
	}
	public void setSubName(String subName) {
		this.subName = subName;
	}
	public String getSubId() {
		return subId;
	}
	public void setSubId(String subId) {
		this.subId = subId;
	}
	public String getPaperNum() {
		return paperNum;
	}
	public void setPaperNum(String paperNum) {
		this.paperNum = paperNum;
	}
	public int getDuration() {
		return duration;
	}
	public void setDuration(int duration) {
		this.duration = duration;
	}
	public int getEarliestSubmit() {
		return earliestSubmit;
	}
	public void setEarliestSubmit(int earliestSubmit) {
		this.earliestSubmit = earliestSubmit;
	}
	public int getLatestLogin() {
		return latestLogin;
	}
	public void setLatestLogin(int latestLogin) {
		this.latestLogin = latestLogin;
	}
	public int getShowMark() {
		return showMark;
	}
	public void setShowMark(int showMark) {
		this.showMark = showMark;
	}
	
}
