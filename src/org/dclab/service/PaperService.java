package org.dclab.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.dclab.mapping.PaperMapperI;
import org.dclab.mapping.TopicMapperI;
import org.dclab.model.ChoicesBean;
import org.dclab.model.PaperBean;
import org.dclab.model.TopicBean;
import org.dclab.utils.MyBatisUtil;
import org.springframework.stereotype.Service;

@Service
public class PaperService {
	
	public Map<Integer, String> TypePointMap = new HashMap<>();//��¼���͵Ķ�Ӧ����
	public Map<Integer, Integer> typeNum = new HashMap<>();//��¼ÿ�����͵����
	
	private String paperNum;
	
	
	//set get
	public Map<Integer, String> getTypePointMap() {
		return TypePointMap;
	}

	public void setTypePointMap(Map<Integer, String> typePointMap) {
		TypePointMap = typePointMap;
	}

	public Map<Integer, Integer> getTypeNum() {
		return typeNum;
	}

	public void setTypeNum(Map<Integer, Integer> typeNum) {
		this.typeNum = typeNum;
	}
	//*************
	//paper����
	public Map<String, String> subjectAdd(PaperBean paperBean){
		SqlSession sqlSession =MyBatisUtil.getSqlSession();
		PaperMapperI paperMapperI = sqlSession.getMapper(PaperMapperI.class);
		Map<String, String> response = new HashMap<>();
		
		if(paperMapperI.addPaper(paperBean)!=1)
		{
			response.put("info", "paper����ʧ��");
			sqlSession.close();
			return response;
		}
		sqlSession.commit();
		
		this.paperNum = paperBean.getPaperNum();
		
		response.put("info", "����ɹ�");
		sqlSession.close();
		return response;
	}
	
	public Map<String, String> topicAdd(String content, Map<Integer, String> choice,List<Integer> answer,int typeId)
	{
		Map<String, String> response = new HashMap<>();
		SqlSession sqlSession = MyBatisUtil.getSqlSession();
		String statement = "org.dclab.mapping.topicMapper.add";
		TopicMapperI topicMapperI = sqlSession.getMapper(TopicMapperI.class);
		
		TopicBean topicBean = new TopicBean(typeNum.get(typeId), content, typeId, this.paperNum, TypePointMap.get(typeId));
		
		if(sqlSession.insert(statement, topicBean)!=1)
		{
			response.put("info", "��Ŀ�������ݿ�ʧ��");
			sqlSession.close();
			return response;
		}
		sqlSession.commit();
		
		int topicId=topicBean.getTopicId();
		String choiceId=new String();//���list�����ȷѡ������ݿ�id
		for(int str : choice.keySet())
		{
			ChoicesBean choicesBean=new ChoicesBean();
			choicesBean.setContent(choice.get(str));
			choicesBean.setTopicId(topicId);
			String statement1 = "org.dclab.mapping.choiceMapper.add";
			sqlSession.insert(statement1, choicesBean);
			sqlSession.commit();
			if(answer.contains(str))
			{
				if(choiceId.isEmpty())
					choiceId=String.valueOf(choicesBean.getChoiceId());
				else
					choiceId=choiceId+","+String.valueOf(choicesBean.getChoiceId());
			}
		}
		
		if(topicMapperI.updateAnswer(choiceId)!=1)
		{
			response.put("info", "����topic�����ȷ��ʧ��");
			sqlSession.close();
			return response;
		}
		sqlSession.commit();
		
		response.put("info", "����ɹ�");
		sqlSession.close();
		return response;
	}


}
