import cv2
import sys
import time
import predObj

sys.setrecursionlimit(10000)

WIDTH = 0
HEIGHT = 0

beenTo = [[]]

def initBT(w, h):
    global beenTo
    beenTo = [[0 for xv1 in range(h)] for xv2 in range(w)]

def getDiff(img, r1, c1, r2, c2):
    p1 = img[r1, c1]
    p2 = img[r2, c2]
    return max(abs(int(p1[0]) - int(p2[0])), abs(int(p1[1]) - int(p2[1])), abs(int(p1[2]) - int(p2[2])))

def floodFill(img, row, column, thresh):
    if beenTo[row][column] == 1:
        return []
    beenTo[row][column] = 1
    ret = [[row, column]]
    if row > 0 and getDiff(img, row, column, row-1, column) < thresh:
        ret += floodFill(img, row-1, column, thresh)
    if row < img.shape[0] - 1 and getDiff(img, row, column, row+1, column) < thresh:
        ret += floodFill(img, row+1, column, thresh)
    if column > 0 and getDiff(img, row, column, row, column-1) < thresh:
        ret += floodFill(img, row, column-1, thresh)
    if column < img.shape[0] and getDiff(img, row, column, row, column+1) < thresh:
        ret += floodFill(img, row, column+1, thresh)
    return ret
        

def Srch(img, thresh, padding, minRowWidth, minColumnHeight, minSize):
    """Floodfills for similar colored regions
        args (img, thresh, padding, minRowWidth, minColumnHeight, minSize)"""
    initBT(img.shape[0], img.shape[1])
    ret = []
    for i in range(img.shape[0]):  #height (rows)
        for j in range(img.shape[1]):  #width (columns)
            if beenTo[i][j] == 1:
                continue
            area = floodFill(img, i, j, thresh)
            if(len(area) > minSize):
                minR = img.shape[0]
                maxR = 0
                minC = img.shape[1]
                maxC = 0
                for k in area:
                    minR = min(minR, k[0] - padding)
                    minC = min(minC, k[1] - padding)
                    maxR = max(maxR, k[0] + padding)
                    maxC = max(maxC, k[1] + padding)
                if minR < 0:
                    minR = 0
                if minC < 0:
                    minC = 0
                if maxR > img.shape[0]:
                    maxR = img.shape[0]
                if maxC > img.shape[1]:
                    maxC = img.shape[1]
                if maxR - minR < minRowWidth or maxC - minC < minColumnHeight:
                    continue
                ret.append([minR, minC, maxR, maxC])
    return ret

def test2(save):
    predObj.loadModel()
    imgN = 0
    if save:
        f = open("numFood.txt", "r")
        imgN = int(f.read())
        f.close()
    cam = cv2.VideoCapture(0)
    cv2.namedWindow("YEE2")
    while True:
        rVal, img = cam.read()
        origimg = img
        drawimg = origimg.copy()
        MP = 15
        WIDTH = round(img.shape[1] / MP)
        HEIGHT = round(img.shape[0] / MP)
        img = cv2.resize(img, (WIDTH, HEIGHT))
        for thresh in range(0, 50, 10):
            roi = Srch(img, thresh, 4, 10, 10, img.shape[0] * img.shape[1] / 100) # returns roi with index 0 --> minY(row) 1 --> minX(column) 2 --> maxY(row) 3 --> maxX(column)
            for i in roi:
                if not save and predObj.detObj(cv2.resize(img[i[0]: i[2], i[1]: i[3]], (64, 64)) / 255, 0.5):
                    cv2.rectangle(drawimg, (i[1] * MP, i[0] * MP), (i[3] * MP, i[2] * MP), (0, 255, 0), 10)
                if save:
                    cv2.rectangle(drawimg, (i[1] * MP, i[0] * MP), (i[3] * MP, i[2] * MP), (0, 255, 0), 2)
                    print("imgSize " + str(i[3] - i[1]) + " " + str(i[2] - i[0]))
                    try:
                        cv2.imwrite("trainFood/" + str(imgN) + ".png", cv2.resize(img[i[0]: i[2], i[1]: i[3]], (96, 96)))
                        imgN += 1
                    except:
                        print("OOPSEES")
        #cv2.putText(drawimg, str(thresh), (30, 60), cv2.FONT_HERSHEY_SIMPLEX, 2, 255, cv2.LINE_8)
        cv2.imshow("YEE2", drawimg)
        time.sleep(0.3)
        if cv2.waitKey(1) == 27:
            cv2.destroyAllWindows()
            break

if __name__ == "__main__":
    test2(True)
