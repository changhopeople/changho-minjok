from PIL import Image, ImageDraw

# 이미지 경로 (기존 파일 덮어쓰기)
input_path = r"D:\★★★★★사업 개발부\창호의민족\landing-page-images\v2\output\07-대기업파트너.jpg"

# 이미지 열기
img = Image.open(input_path)
draw = ImageDraw.Draw(img)

# 이미지 크기 확인
width, height = img.size
print(f"이미지 크기: {width}x{height}")

# 하단 두번째 줄 텍스트 영역만 검은색으로 덮기
text_area_top = height - 70
text_area_bottom = height - 25
draw.rectangle([50, text_area_top, width - 50, text_area_bottom], fill="#1E1E1E")

# 기존 파일에 저장
img.save(input_path, quality=95)
print(f"수정 완료: {input_path}")
